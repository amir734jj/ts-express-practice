import * as express from 'express';
import { DependencyContainer } from 'tsyringe';
import { Request } from 'express';
import { Response } from 'express';
import UserLogic from '../logic/UserLogic';
import { User } from '../models/user';

export default function UserController(container: DependencyContainer) {
    let router = express.Router();

    router.get("/:id", async (req: Request, res: Response) => {
        let userLogic = container.resolve<UserLogic>("UserLogic");
        let user = await userLogic.get(req.params.id);

        res.json(user);
    });

    router.get("", async (_: Request, res: Response) => {
        let userLogic = container.resolve<UserLogic>("UserLogic");
        let users = await userLogic.getAll();

        res.json(users);
    });

    router.post("", async (req: Request, res: Response) => {
        let userLogic = container.resolve<UserLogic>("UserLogic");
        let user: User = req.body;
        user = await userLogic.save(user);

        res.json(user);
    });

    router.put("/:id", async (req: Request, res: Response) => {
        let userLogic = container.resolve<UserLogic>("UserLogic");
        let user: User = req.body;
        user = await userLogic.update(req.params.id, user);

        res.json(user);
    });

    router.delete("/:id", async (req: Request, res: Response) => {
        let userLogic = container.resolve<UserLogic>("UserLogic");
        let user = await userLogic.delete(req.params.id);

        res.json(user);
    });

    return router;
}
