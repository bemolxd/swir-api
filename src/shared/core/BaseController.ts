import { Response } from 'express';

interface ResponseBody {
  message: string;
  error?: any;
}

export abstract class BaseController {
  public static jsonResponse(res: Response, code: number, body: ResponseBody) {
    return res.status(code).json({ ...body });
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public badRequest(res: Response, { message }: ResponseBody) {
    return BaseController.jsonResponse(res, 400, {
      message: message ?? 'Bad request',
    });
  }

  public notFound(res: Response, { message }: ResponseBody) {
    return BaseController.jsonResponse(res, 404, {
      message: message ?? 'Not found',
    });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  public fail<T>(res: Response, error: T | string) {
    const err = typeof error === 'string' ? { message: error } : error;
    return res.status(500).json(err);
  }
}
