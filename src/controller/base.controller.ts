import { Response } from "express";

/**
 * Provides functions to be used with express routes. Serves common CRUD fuctionality.
 */
export class BaseController {

    /**
     * Sends the Rows as JSON in the body of response, and sets status to 200
     * @param doc the SQL Rows to be returned to the client as JSON
     * @param res the response object that will be used to send http response
     */
    jsonRes(doc: any, res: Response) {
        res.status(200).json(doc);
    }

    /**
     * Provides a simple, standardised way of responding to errors. Includes err object in response if env().stage  is 'dev'
     * @param err error object of any type genereated by the system
     * @param message custom response message to be provided to the client in a JSON body response ({error:'message'})
     * @param res response object to be used to to send
     * @param status custom status code, defaults to 500
     */
    errRes(err: any, res: Response, message = "Sever Error", status = 500) {
        if (process.env.NODE_ENV === "development") {
            res.status(status).send({ error: message, err });
        } else {
            res.status(status).json({ error: message });
        }
    }
}