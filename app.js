const sharp = require('sharp');
const compressImages = require('compress-images');
const gifsicle = require('gifsicle');

let inputPath = process.argv[2];

let width = Number(process.argv[3]);

function resizeImg(inputPath, outputPath, width) {
    
    sharp(inputPath).resize({ width: width })
        .toFile(outputPath, (error) => {
            if (error) {
                console.log(err);
            } else {
                console.log('compleated');
                compressIMG(outputPath, './compressed/');
            }
        })
}

function compressIMG(inputPath, outputPath) {

    compressImages(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );

}

resizeImg(inputPath, './temp/image-resized.png', width);