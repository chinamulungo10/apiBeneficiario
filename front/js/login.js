const auth = async () => {
    try {
        let formData = getFormData();
        let authorization = `${formData.email}:${formData.password}`;
        let base64 = btoa(authorization);

        const response = await axios.get(`${ENDPOINT}/auth`, {
            headers: {
                Authorization: `Basic ${base64}`,
                'Cache-Control': 'no-store'
            }
        });

        const user = await response.data;

        if (user === null) {
            Swal.fire("Login not successful! Try again.");
        }
        else {
            setLogged(user);
            Swal.fire("Login successful!");
            window.location.reload();
        }
    } catch {
        Swal.fire("Login not successful! Try again.");
    }
}

const setLogged = (user) => {
    user.loggedAt = new Date();
    localStorage.setItem('logged', JSON.stringify(user));
    return true;
}

const getLogged = () => {
    return JSON.parse(localStorage.getItem('logged'))
}

const verify = async () => {
    try {
        let logged = getLogged();

        if (logged == null) {
            return;
        }

        let authorization = `${logged.email}:${logged.password}`;
        let base64 = btoa(authorization);

        axios.defaults.headers.common['Authorization'] = `Basic ${base64}`;
        axios.defaults.headers.common['Cache-Control'] = 'no-store';

        const response = await axios.get(`${ENDPOINT}/verify`);

        const user = await response.data;

        if (user) {
            window.location = 'users.html'
        }
    } catch {
        window.location = 'login.html'
    }
}

const out = () => {
    setLogged(null);
    delete axios.defaults.headers.common["Authorization"];
}

const getFormData = () => {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let data = Object.fromEntries(formData)
    return data;
}

verify();