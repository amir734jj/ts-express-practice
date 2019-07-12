import { DependencyContainer } from 'tsyringe';
import UserDal from '../dal/UserDal';
import UserLogic from '../logic/UserLogic';

export function populateIoC(container: DependencyContainer) {

    container.register("UserDal", {
        useClass: UserDal
    });

    container.register("UserLogic", {
        useClass: UserLogic
    });
}
