import {
    Field,
    GraphQLISODateTime,
    HideField,
    ID,
    ObjectType,
    registerEnumType
} from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';
import slugify from "slugify";




export enum RoleType {
    User = 'USER',
    ADMIN = 'ADMIN',
}

registerEnumType(RoleType, {
    name: ' RoleType',
    description: 'User role',
})

@Schema()
@ObjectType('User')
export class User extends Document{
    @Field(() => ID)
    _id: string;

    @Prop({ type: String, unique: true })
    @Field()
    username: string;

    @Prop({ type: String, unique: true })
    @Field()
    email: string;

    @Prop({ type: String, nullable: true })
    @Field(() => String, { nullable: true })
    fullName: string;

    @Prop({ type: String })
    @HideField()
    password: string;

    @Prop({ required: false })
    @Field(() => String, { nullable: true })
    avatar: string;

    @Prop({ type: String, enum: RoleType, default: RoleType.User })
    @Field(() => RoleType, { defaultValue: RoleType.User })
    role: RoleType;

    @Prop({ type: String, selected: false, required: false })
    @HideField()
    CurrentHashedRefreshToken?: string;

    @Prop({ type: Date, default: Date.now })
    @Field(() => GraphQLISODateTime)
    createdAt?: Date;

    @Prop({ type: Date, default: Date.now })
    @Field(() => GraphQLISODateTime)
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create indexes
UserSchema.index({
    username: 'text',
    email: 'text',
    fullName: 'text',
});



/* Helper Methods*/
function encryptPassword(this: User & { password: string } ) {
    return UserSchema.pre('save', async function (next) {
        try {
            if (!this.isModified('password')) return next();

            // Hash the password using bcryptjs
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
            return next();
        } catch (error) {
            return next(error)
        }
    })
}
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateEmail(this:User) {
    return UserSchema.pre('save', function (next) {
        try {
            if (!this.email) return next();
            if (!emailRegex.test(this.email)) {
                return next(new Error('Invalid email'));
            }
            return next();
        } catch (error) {
            return next(error)
        }
    })
}
function updateUserName(this: User) {
    return UserSchema.pre('save', async function (next) {
        try {
            if (!this.isModified('username')) return next();
            this.username = slugify(this.username, { lower: true });// Used slugify fro better performance
            return next();
        } catch (error) {
            return next(error)
        }
    })
}

function setDefaultFullName(this: User) {
    return UserSchema.pre('save', async function (next) {
        try {
            if (this.username && !this.fullName) {
                this.fullName = this.username;
            }
            return next();
        } catch (error) {
            return next(error)
        }
    });
}


    
        
    

