import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);

        if (validation.error) {
            throw { type: "unprocessable_entity", message: "Schema does not match" };
        }

        next();
    }
}