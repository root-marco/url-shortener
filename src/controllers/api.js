import URL from "../models/Url.js";

export async function shortUrlPost(req, res) {

    const originalURL = req.body.url;
    const validURL = /^(http|https):\/\/[^ "]+$/;

    if (validURL.test(originalURL)) {
        try {
            const findURL = await URL.findOne({
                original_url: originalURL,
            });
            if (findURL) {
                res.json({
                    original_url: findURL.original_url,
                    short_url: findURL.short_url,
                });
            } else {
                const new_url = new URL({
                    original_url: originalURL,
                    short_url: "",
                });
                new_url.short_url = new_url._id.toString().slice(-6);
                await new_url.save();
                res.json({
                    original_url: new_url.original_url,
                    short_url: new_url.short_url,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "server error",
            });
        }
    } else {
        res.json({
            "error": 'invalid url',
        });
    }

}

export async function shortUrlGet(req, res) {

    try {
        const url = await URL.findOne({
            short_url: req.params.short_url,
        });
        res.redirect(url.original_url);
    } catch (error) {
        res.json({
            error: error,
        });
    }

}

export async function helloGet(req, res) {

    res.json({
        greeting: "hello api",
    });

}