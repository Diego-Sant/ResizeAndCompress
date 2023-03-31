const uploadBox = document.querySelector(".upload-box"); // div da área de selecionar a imagem

previewImg = uploadBox.querySelector("img"); // Pega a imagem selecionada nos arrquivos
fileInput = uploadBox.querySelector("input"); // Pega o input de selecionar uma imagem

widthInput = document.querySelector(".width input"); // Seleciona o input da largura
heightInput = document.querySelector(".height input"); // Seleciona o input da altura

ratioInput = document.querySelector(".ratio input"); // Seleciona as proporções da imagem
qualityInput = document.querySelector(".quality input"); // Seleciona o checkbox de reduzir a qualidade

downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return; // Retorna caso não tenha selecionado nenhuma imagem
    previewImg.src = URL.createObjectURL(file); // Cria uma URL para a imagem selecionada
    previewImg.addEventListener("load", () => { // Tudo dentro das chaves só irão ativar quando a imagem estiver carregada
        widthInput.value = previewImg.naturalWidth; // Diz a largura da imagem
        heightInput.value = previewImg.naturalHeight; // Diz a altura da imagem
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight; // Trava a proporção da imagem sendo largura / altura
        document.querySelector(".wrapper").classList.add("active") // Adiciona classe "active" ao ser carregado uma imagem
    })
}

widthInput.addEventListener("keyup", () => {
    // Se(?) o ratioInput estiver checked, será feito valor do width dividido(/) pela proporção da imagem, caso contrário(:) será o valor do height
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup", () => {
    // Se(?) o ratioInput estiver checked, será feito valor do height multiplicado(*) pela proporção da imagem, caso contrário(:) será o valor do width
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const downloadImg = document.createElement("a"); // Criar elemento <a>
    const ctx = canvas.getContext("2d");

    // Se(?) o checkbox de reduzir a qualidade estiver marcado, a qualidade vai para 0.7, caso contrário(:), a qualidade vai para 1.0
    const imgQuality = qualityInput.checked ? 0.7 : 1.0; // 0.7 é 70% da qualidade da imagem, enquanto 1.0 é 100%

    // Proporcionar as imagens de acordo com a largura e altura selecionada
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // Mostrar a imagem e suas configurações
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    downloadImg.href = canvas.toDataURL("image/jpeg", imgQuality);
    downloadImg.download = new Date().getTime(); // Passar o tempo atual como valor de download
    downloadImg.click(); // Clicar no elemento <a> para fazer o download
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click()); // Adiciona o efeito do input de selecionar a imagem em toda a div