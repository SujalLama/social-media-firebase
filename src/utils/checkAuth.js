export const checkLocalStorage = () => {
    const user = window.localStorage.getItem('userInfo') 
        ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

        if(user) {
            return true;
        }

        return false;
}

export const checkAdmin = () => {
    const user = window.localStorage.getItem('userInfo') 
        ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

        if(user?.isAdmin) {
            return true;
        }

        return false;
}