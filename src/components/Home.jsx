import React, { useEffect, useRef, useState } from 'react';
import { Box, Input, TextField, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
class Canvas {
    constructor(canvasRef) {
        this.canvasRef = canvasRef;
        this.ctx = canvasRef.current.getContext('2d');
    }

    clearCanvas() {
        const canvas = this.canvasRef.current;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawBorder(x, y, width, height, color, lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }

    drawImage(imageUrl, x, y, width, height) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            this.ctx.drawImage(image, x, y, width, height);
        };
    }
    drawlogo(logoUrl, x, y, width, height) {
        const logo = new Image();
        logo.src = logoUrl;
        logo.onload = () => {
            this.ctx.drawImage(logo, x, y, width, height);
        };
    }

    drawText(text, x, y, fontSize, textColor, alignment, maxCharactersPerLine) {
        this.ctx.font = `${fontSize}px Arial`;

        const splitTextIntoLines = (text, maxCharactersPerLine) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';

            words.forEach(word => {
                if (currentLine.length + word.length <= maxCharactersPerLine) {
                    currentLine += word + ' ';
                } else {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                }
            });

            if (currentLine.trim() !== '') {
                lines.push(currentLine.trim());
            }

            return lines;
        };

        const lines = splitTextIntoLines(text, maxCharactersPerLine);

        this.ctx.fillStyle = textColor;
        this.ctx.textAlign = alignment;

        lines.forEach((line, index) => {
            this.ctx.fillText(line, x, y + index * (fontSize + 5));
        });
    }


    drawButton(text, x, y, width, height, textColor, bgColor) {
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.fillStyle = textColor;
        this.ctx.font = '30px Arial';
        const textX = x + width / 2 - this.ctx.measureText(text).width / 2;
        const textY = y + height / 2 + 6; // Adjust 6 to vertically center the text
        this.ctx.fillText(text, textX, textY);
    }
}

const Home = () => {
    const data = {
        "caption": {
            "text": "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
            "position": { "x": 60, "y": 120 },
            "max_characters_per_line": 31,
            "font_size": 40,
            "alignment": "left",
            "text_color": "#FFFFFF"
        },
        "cta": {
            "text": "Shop Now",
            "position": { "x": 60, "y": 220 },
            "text_color": "#FFFFFF",
            "background_color": "#000000"
        },
        "image_mask": {
            "x": 56,
            "y": 442,
            "width": 970,
            "height": 600
        },
        "urls": {
            "mask": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
            "stroke": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
            "design_pattern": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"
        }
    };
    const [colorValue, setColorValue] = useState('#a3080c');
    const canvasRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D');
    const [logoUrl, setlogoUrl] = useState('https://i.pinimg.com/474x/4f/18/1d/4f181d9add83431113fd12258ff3ffaa.jpg');
    const [textdata, setText] = useState('1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs')
    const [cta, setcta] = useState('Shop Now')
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                setImageUrl(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };
    const handlelogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const logoDataUrl = reader.result;
                setlogoUrl(logoDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };
    const [colors, setcolors] = useState(['#afe46c', '#4b652a', '#2cbfdf', '#b417ce', '#de0c71'])
    const handleColorChange = (newValue) => {
        setColorValue(newValue);
        setcolors(prevColors => {
            const temp = [...prevColors];
            temp.pop();
            return [newValue, ...temp];
        });
    };
    console.log(colorValue, imageUrl, textdata, cta,logoUrl);
    useEffect(() => {
        const canvas = new Canvas(canvasRef);
        canvas.clearCanvas();
        canvas.drawBackground(colorValue, 0, 0, 1080, 850);
        canvas.drawBorder(57, 557, 955, 523, 'white', 5);
        canvas.drawImage(imageUrl, 60, 560, 950, 510);
        canvas.drawText(textdata, 60, 120, 40, '#FFFFFF', 'left', data.caption.max_characters_per_line);
        canvas.drawButton(cta, 60, 220, 200, 80, 'black', 'white');
        canvas.drawBorder(675, 27, 310, 190, 'white', 5);
        canvas.drawlogo(logoUrl, 680, 30, 300, 180)
    }, [imageUrl, colorValue, textdata, cta,logoUrl,data.caption.max_characters_per_line]);

    return (
        <Box sx={{ height: "100vh", display: "flex", width: "100%", }}>
            <Box sx={{ background: "#f0f0f0", width: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding:4, }} >
                <canvas ref={canvasRef} width={1080} height={1080} style={{ width: "400px", height: "400px" }}></canvas>
            </Box>
            <Box sx={{ width: "60%", display: "flex", alignItems: 'center', justifyContent: "center", padding:10, }} >
                <Box sx={{ width: "80%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Typography variant='h4' textAlign={'center'}> <strong>Ad customization</strong> </Typography>
                    <Typography variant='paragraph' textAlign={'center'}>Customise your ad and get the templates accordingly</Typography>
                    <Box sx={{ marginY: "20px" }}>
                        <Typography variant='paragraph'>Change the ad creative image. <Input type='file' onChange={handleImageChange}></Input></Typography>
                    </Box>
                    <Box sx={{ marginY: "20px" }}>
                        <Typography variant='paragraph'>Change the ad creative logo. <Input type='file' onChange={handlelogoChange}></Input></Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginY: "20px" }}><Box sx={{ borderTop: "1px solid", width: "100%" }}></Box><Typography textAlign={'center'} sx={{ width: "auto", marginX: "2%" }}>Edit Contents</Typography><Box sx={{ borderTop: "1px solid", width: "100%" }}></Box></Box>
                    <Box>
                        <TextField value={textdata} onChange={(e) => setText(e.target.value)} fullWidth margin='normal' label="Ad Content" />
                    </Box>
                    <Box>
                        <TextField value={cta} onChange={(e) => setcta(e.target.value)} fullWidth margin='normal' label="CTA" />
                    </Box>
                    {/* <small>Choose your color</small> */}
                    <MuiColorInput label='Choose your color' margin='normal' format='hex' value={colorValue} onChange={handleColorChange}></MuiColorInput>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {colors.map((item) => (
                            <Box key={item} height={'20px'} width={'20px'} onClick={() => setColorValue(item)} sx={{ backgroundColor: item, borderRadius: "50%", cursor: 'pointer' }}></Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
