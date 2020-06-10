import { HTTPServer } from './server';

export function getOpenApiDescription(server: HTTPServer): string {
    return '### EOSIO Contract API\n' +
        '*Made with ♥️ by [pink.network](https://pink.network/)*\n' +
        '#### Current Chain: ' + server.connection.chain.name + '\n' +
        `#### Provided by: [${server.config.provider_name}](${server.config.provider_url})`;
}

export function getOpenAPI3Responses(codes: number[], data: any): {[key: string]: any} {
    const responses: {[key: string]: any} = {
        '200': {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {type: 'boolean', default: true},
                            data: data,
                            query_time: {type: 'integer', nullable: true}
                        }
                    }
                }
            }
        },
        '401': {
            description: 'Unauthorized',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {type: 'boolean', default: false},
                            message: {type: 'string'}
                        }
                    }
                }
            }
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {type: 'boolean', default: false},
                            message: {type: 'string'}
                        }
                    }
                }
            }
        }
    };

    const result: {[key: string]: any} = {};

    for (const code of codes) {
        result[String(code)] = responses[String(code)];
    }

    return result;
}

export const paginationParameters = [
    {
        name: 'page',
        in: 'query',
        description: 'Result Page',
        required: false,
        schema: {type: 'integer'},
        default: 1
    },
    {
        name: 'limit',
        in: 'query',
        description: 'Results per Page',
        required: false,
        schema: {type: 'integer'},
        default: 100
    },
    {
        name: 'order',
        in: 'query',
        description: 'Order direction',
        required: false,
        schema: {type: 'string', enum: ['asc', 'desc']},
        default: 'desc'
    }
];
