export const lastFmToken = {
    save(userToken: string | null) {
        return storage.setItem("local:user_session_last_fm", userToken);
    },
    get(): Promise<string | null> {
        return storage.getItem("local:user_session_last_fm");
    }
}