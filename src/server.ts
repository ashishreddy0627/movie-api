import app from './app';

/**
 * Starts the server on the specified port.
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
