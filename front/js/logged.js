const getLogged = () => {
    return JSON.parse(localStorage.getItem('logged'))
}

const verify = async () => {
    try {
        let logged = await getLogged();

        if (logged == null) {
            window.location = 'login.html'
            return;
        }

        let authorization = `${logged.email}:${logged.password}`;
        let base64 = btoa(authorization);

        axios.defaults.headers.common['Authorization'] = `Basic ${base64}`;
        axios.defaults.headers.common['Cache-Control'] = 'no-store';

        const response = await axios.get(`${ENDPOINT}/verify`);

        const user = await response.data;

        if (!user) {
            window.location = 'login.html'
        }
        else {
            let loggeAt = new Date(user.loggedAt);
            let dataAtual = new Date();
        }
    } catch {
        window.location = 'login.html'
    }
}

const out = () => {
    localStorage.removeItem('logged');
    delete axios.defaults.headers.common["Authorization"];
}

verify();