import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    name: string
}

function getHeaders(req: NextApiRequest): Headers {
    const myHeaders = new Headers();
    Object.keys(req.headers).forEach(v => {
        if (v !== 'connection') { // https://github.com/nodejs/undici/issues/1470
            //if (v !== 'transfer-encoding') { // I don't know why this is failing since nextjs 13.3.0
            myHeaders.append(v, req.headers[v] as string);
            // }
        }
    });
    return myHeaders;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const headers = getHeaders(req);

    try {
        const resp = await fetch('https://example.com', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body)
        });
        console.log(resp);
    } catch (e) {
        console.log(e);
    }

    res.status(200).json({name: 'John Doe'})
}
