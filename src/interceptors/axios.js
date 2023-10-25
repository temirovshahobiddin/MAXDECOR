        import axios from "axios";
        import Cookies from 'js-cookie';
        axios.defaults.baseURL = 'https://api.oboi-maxdecor.uz/api/v1/';

        const csrftoken = Cookies.get('csrftoken'); // Retrieve the CSRF token
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken