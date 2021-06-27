export async function rootGet(req, res) {

    res.sendFile(`${process.cwd()}/src/views/index.html`);

}