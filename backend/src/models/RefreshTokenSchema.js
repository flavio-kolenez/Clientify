import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  client_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 604800 // 7 dias em segundos (TTL automático do MongoDB)
  },
  expires_at: {
    type: Date,
    required: true
  },
  is_revoked: {
    type: Boolean,
    default: false
  },
  last_used: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para performance
refreshTokenSchema.index({ client_id: 1, created_at: -1 });
refreshTokenSchema.index({ is_revoked: 1 });
refreshTokenSchema.index({ expires_at: 1 });

// Método para revogar token
refreshTokenSchema.methods.revoke = function() {
  this.is_revoked = true;
  return this.save();
};

// Método estático para limpar tokens expirados manualmente
refreshTokenSchema.statics.cleanupExpired = function() {
  return this.deleteMany({
    $or: [
      { is_revoked: true },
      { expires_at: { $lt: new Date() } }
    ]
  });
};

export default mongoose.model("RefreshToken", refreshTokenSchema);