import { Response } from 'express';

export function sendApiResponse(
    res: Response,
    status: boolean,
    statusCode: number,
    message: string,
    data: any,
): void {
    res.status(statusCode).json({
        status,
        statusCode,
        message,
        data,
    });
}

export const objectToQueryString = (obj) => {
    const queryString = Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    return queryString;
}

export const removeDuplicates = (arr) => {
    return arr.filter((value, index, self) =>
        index === self.findIndex((v) => v === value)
    );
}

export const sortAnObjByItsKeys = (unsortedObj) => {
    let sortedObj = {};
    Object.keys(unsortedObj).sort().forEach(key => {
        sortedObj[key] = unsortedObj[key];
    })
    return sortedObj
}

export const moveItemToFirstIndex = (array, index) => {
    if (index >= array.length || index < 0) {
        // Index is out of bounds
        return array;
    }
    const item = array.splice(index, 1)[0]; // Remove item at the given index
    array.unshift(item); // Add the item at the beginning of the array
    return array;
}


export const requestParser = (req): any => {
    return {
        "action": req.action || "",
        "method": req.method,
        "url": req.originalUrl,
        "params": req.params,
        "query": req.query,
        "body": req.body,
        "user": req.user,
        "session": req.session,
        "headers": req.rawHeaders,
        "sessionID": req.sessionID,
        "exception": req.exceptionError
    }
}