import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';
import bcrypt from "bcrypt";

const superUser = {
    id: '0001',
    email: 'mdhmaktaruzzaman9101@gmail.com',
    //password: config.super_admin_password,
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false,
};
const seedSuperAdmin = async () => {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = await UserModel.findOne({ role: USER_ROLE.superAdmin });
    
    const password = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD as string, 10);
    superUser.password = password

    if (!isSuperAdminExits) {
        await UserModel.create(superUser);
    }
};
export default seedSuperAdmin;