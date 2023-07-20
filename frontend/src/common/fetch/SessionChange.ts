import client from "./apollo-client";

// Call this function when the session changes
// for example, when the user logs in or logs out
// Does not redirect
async function SessionChange(newToken?: string) {
    const token = newToken;

    if (token == null) {
        // Token is null, so remove it from local storage
        localStorage.removeItem("token");
        // Reset cache of apollo client
        await client.resetStore();
        // Apollo client will get new token on next request
        return;
    }

    // Set token in local storage
    localStorage.setItem("token", token);

    // Reset cache of apollo client
    await client.resetStore();
}

export default SessionChange;