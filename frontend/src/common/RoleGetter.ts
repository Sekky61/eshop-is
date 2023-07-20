import jwt_decode from 'jwt-decode';

// Reads properties from token and returns role
export default function GetRoleFromToken(): string | null {
    // get jwt
    var jwt = localStorage.getItem('token');
    if (jwt == null) {
        return null;
    }
    // decode jwt
    var decoded = jwt_decode(jwt);

    // If decoded has a type of object and it is not null and it has an exp property
    if (typeof decoded === 'object' && decoded != null && 'exp' in decoded) {
        if (typeof decoded.exp === 'number') {
            if (decoded.exp < Date.now() / 1000) {
                return null;
            }
        }
    }

    // Get role
    if (typeof decoded === 'object' && decoded != null && 'role' in decoded) {
        return decoded.role as string;
    }

    return null;
}