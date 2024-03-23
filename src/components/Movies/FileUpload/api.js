const getMoviesFromDatabase = async () => {
    try {
        const res = await fetch('http://127.0.0.1:3000/movies', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            toast.error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        toast.error("API offline");
        return [];
    }
};

export default getMoviesFromDatabase
