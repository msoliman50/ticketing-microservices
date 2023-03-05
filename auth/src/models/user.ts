import mongoose from 'mongoose';
import Password from '../utils/password';

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(props: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserAttrs>(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  next();
});

userSchema.statics.build = (props: UserAttrs) => new User(props);

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
