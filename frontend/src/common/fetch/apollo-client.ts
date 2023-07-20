import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, concat } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5024/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    if (typeof window === 'undefined') {
        // We are in the server, so we don't need to do anything
        return {};
    }
    // We are in the browser, so get the token from local storage
    let token = localStorage.getItem('token');

    if (token !== null) {
        // If the token is expired, remove it from local storage
        var decoded = jwt_decode(token);
        // If decoded has a type of object and it is not null and it has an exp property
        if (typeof decoded === 'object' && decoded != null && 'exp' in decoded) {
            // If the exp property is a number
            if (typeof decoded.exp === 'number') {
                // If the token is expired
                if (decoded.exp < Date.now() / 1000) {
                    // Token expired - removing from local storage
                    localStorage.removeItem('token');
                    token = null;
                }
            }
        }
    }

    if (token === null) {
        // We have no token, lets fetch one
        var res = await fetch('http://localhost:5024/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation GetNewSession {
              newSession {
                token
              }
            }
                `,
            }),
        })
            .then((res) => res.json());

        token = res.data.newSession.token;

        if (token == null) {
            throw new Error("No token returned");
        }

        localStorage.setItem('token', token);
    }

    if (token == null) {
        throw new Error("No token");
    }

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const client = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

export default client;
