import { PersonalData, TourCoin, User } from '../entity';
import { UserService } from '../services';
import { validate } from 'class-validator';
import { UserRole } from '../entity/User';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    async logIn(username: string, password: string) {
        try {
            const resp = await this.userService.logIn(username, password);

            if (!resp) {
                return {
                    response: { error: 'User not Found' },
                    status: 404,
                };
            }

            const response = {
                id: resp.id,
                username: resp.username,
                email: resp.email,
                userRole: resp.role,
                isSingle: resp.isSingle,
                isDeleted: resp.isDeleted,
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error finding User by Username' },
                status: 500,
            };
        }
    }

    async create(
        username: string,
        email: string,
        password: string,
        isSingle: boolean,
        userRole: UserRole,
        firstName: string,
        lastName: string,
        location: string,
        phoneNumber: string,
        coins: number
    ) {
        try {
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = isSingle;
            newUser.role = userRole;

            const newPerData = new PersonalData();
            newPerData.firstName = firstName;
            newPerData.lastName = lastName;
            newPerData.location = location;
            newPerData.phoneNumber = phoneNumber;

            const newTourCoin = new TourCoin();
            newTourCoin.coins = coins;

            const userErrors = await validate(newUser);
            const perErrors = await validate(newPerData);

            if (userErrors.length > 0 || perErrors.length > 0) {
                console.log(
                    'Validation failed. Errors:',
                    userErrors,
                    perErrors
                );
                return { response: { error: 'Validation error' }, status: 400 };
            }
            const resp = await this.userService.create(
                newUser,
                newPerData,
                newTourCoin
            );
            const response = {
                id: resp.id,
                username: resp.username,
                email: resp.email,
                isSingle: resp.isSingle,
                isDeleted: resp.isDeleted,
            };

            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error creating new User' },
                status: 500,
            };
        }
    }

    async update(
        userId: string,
        username: string,
        password: string,
        email: string,
        isSingle: boolean,
        userRole: UserRole
    ) {
        try {
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.hashPassword(password);
            newUser.isSingle = isSingle;
            newUser.role = userRole;

            const userErrors = await validate(newUser);

            if (userErrors.length > 0) {
                console.log('Validation failed. Errors:', userErrors);
                return { response: { error: 'Validation error' }, status: 400 };
            } else {
                const user = await this.userService.findById(userId);

                if (user) {
                    const resp = await this.userService.update(newUser, user);
                    const response = {
                        id: resp.id,
                        username: resp.username,
                        email: resp.email,
                        isSingle: resp.isSingle,
                        isDeleted: resp.isDeleted,
                    };
                    return { response, status: 201 };
                } else {
                    return {
                        response: { error: 'User not Found' },
                        status: 404,
                    };
                }
            }
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error updating User' },
                status: 500,
            };
        }
    }

    async delete(userId: string) {
        try {
            const user = await this.userService.findById(userId);

            if (user) {
                const resp = await this.userService.delete(user);
                const response = {
                    id: resp.id,
                    username: resp.username,
                    email: resp.email,
                    isSingle: resp.isSingle,
                    isDeleted: resp.isDeleted,
                };
                return { response, status: 201 };
            }
        } catch (e) {}
    }

    async findByUsername(username: string) {
        try {
            const resp = await this.userService.findByUsername(username);

            if (!resp) {
                return {
                    response: { error: 'User not Found' },
                    status: 404,
                };
            }

            const response = {
                id: resp.id,
                username: resp.username,
                email: resp.email,
                isSingle: resp.isSingle,
                isDeleted: resp.isDeleted,
            };
            return { response, status: 201 };
        } catch (e) {
            console.error(e);
            return {
                response: { error: 'Error finding User by username' },
                status: 500,
            };
        }
    }
}

export default new UserController();
