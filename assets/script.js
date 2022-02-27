var inputId = document.getElementById('inputId');
var qrImg = document.getElementById('qrImg');
inputId.focus();
var newQrImag = new QRCode(qrImg, {
    width: 200,
    height: 200,
    colorDark: "black",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

function inputHandler() {
    const inputValue = inputId.value;
    if (inputValue.length > 1) {
        newQrImag.makeCode(inputValue);

        let imgSrc = qrImg.lastElementChild.src;
        let saveBtn = document.getElementById('saveBtn');
        let copyBtn = document.getElementById('copyBtn');
        saveBtn.setAttribute("href", `${imgSrc}`);
        qrImg.style.display = 'block';
        saveBtn.style.display = 'block';
        copyBtn.style.display = 'block';
    }else{
        qrImg.style.display = 'none';
        saveBtn.style.display = 'none';
        copyBtn.style.display = 'none';
    }

}

// copy image
function imageToBlob(imageURL) {            
    const img = new Image;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.crossOrigin = "";
    img.src = imageURL;
    return new Promise(resolve => {
        img.onload = function () {
        c.width = this.naturalWidth;
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);
        c.toBlob((blob) => {
            // here the image is a blob
            resolve(blob)
        }, "image/png", 0.75);
        };
    })
    }

    async function copyImage(imageURL){
        const blob = await imageToBlob(imageURL)
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
        }

        // image download function
        function openImageFilenameModal(e){
            document.getElementById('fileNameModal').style.display = 'flex';                   
        }

        function downloadImage(){
            document.getElementById('fileNameModal').style.display = 'none';                   
            document.getElementById('mainContent').style.display = 'flex'; 
           let fileName = document.getElementById('filenameId'); 

            let imgSrc = qrImg.lastElementChild.src;
            var el = document.createElement("a");
            el.setAttribute("href", imgSrc);
            el.setAttribute("download", fileName.value);
            document.body.appendChild(el);
            el.click();
            el.remove();
            document.getElementById('filenameId').value = '';
        } 
        function cancleDownloadImage(){
            document.getElementById('fileNameModal').style.display = 'none';                    
            document.getElementById('mainContent').style.display = 'flex';                    
        }

        // image Copy function
        function copyHandler(){
            let imgSrc = qrImg.lastElementChild.src;
            copyImage(imgSrc);
            document.getElementById('copyNotify').style.display = 'block';

            setTimeout(function(){
                document.getElementById('copyNotify').style.display = 'none';
            },2000);
        }