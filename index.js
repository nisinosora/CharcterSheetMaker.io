document.addEventListener("DOMContentLoaded", function () {
    //画像配置用
    const dropZones = document.querySelectorAll(".drop-zone");
    const fileInput = document.getElementById("file-input");
    let currentDropZone = null;
    const imagesData = {};  // 画像データを保持するオブジェクト

    //画像生成用
    const generateButton = document.getElementById("generat");

    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.style.borderColor = "#000";
        });

        dropZone.addEventListener("dragleave", (event) => {
            event.preventDefault();
            dropZone.style.borderColor = "#ccc";
        });

        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropZone.style.borderColor = "#ccc";
            const files = event.dataTransfer.files;
            handleFiles(files, dropZone);
        });

        dropZone.addEventListener("click", () => {
            currentDropZone = dropZone;
            fileInput.click();
        });
    });

    fileInput.addEventListener("change", (event) => {
        const files = event.target.files;
        if (currentDropZone) {
            handleFiles(files, currentDropZone);
            currentDropZone = null;
        }
    });

    function handleFiles(files, dropZone) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    dropZone.innerHTML = "";
                    dropZone.appendChild(img);
                    imagesData[dropZone.id] = { src: e.target.result, width: img.width, height: img.height, dropZone };  // 画像データを保存
                };
                reader.readAsDataURL(file);
            } else {
                alert("画像ファイルを選択してください。");
            }
        }
    }

    generateButton.addEventListener('click', () => {
      if(DateCheck()){
        createImage();
      }
    });

    function createImage(){
      const StanderdPos = {
        "描いた人":{top:60.1, left:435},
        "名前": {top:89.1, left:155},
        "誕生日": {top:116.675, left:155},
        "年齢": {top:144.962, left:84},
        "性別": {top:144.962, left:226.5},
        "出身": {top:172.538, left:84},
        "種族": {top:172.538, left:226.5},
        "身長": {top:200.113, left:84},
        "体重": {top:200.113, left:226.5},
        "髪色": {top:228.4, left:84},
        "眼の色": {top:228.4, left:226.5},
        "一人称": {top:256.688, left:84},
        "二人称": {top:256.688, left:226.5},
        "性格": {top:284.975, left:84},
        "口調": {top:284.975, left:226.5},
        "能力": {top:312.55, left:155},
        "趣味・特技": {top:340.837, left:155},
        "好きなもの": {top:369.125, left:155},
        "嫌いなもの": {top:397.413, left:155},
        "仲の良い人": {top:425.7, left:155},
        "仲の悪い人": {top:453.987, left:155},
        "家族構成": {top:481.562, left:155},
        "その他情報": {top:590.463, left:155},
        "smile": {top:95.4625, left:347.5},
        "anger":{top:95.4625, left:442.5},
        "sad": {top:180.312, left:347.5},
        "happy": {top:180.312, left:442.5},
        "full": {top:449.038, left:392.5}
      }

      const offsetYs = {
        "名前": 0, //入力項目
        "誕生日": 30,
        "年齢": 0,
        "性別": 0,
        "出身": 30,
        "種族": 30,
        "身長": 60,
        "体重": 60,
        "髪色": 90,
        "眼の色" : 90,
        "一人称": 120,
        "二人称": 120,
        "性格" : 150,
        "口調":150,
        "能力": 225,
        "趣味・特技": 255,
        "好きなもの": 285,
        "嫌いなもの": 310,
        "仲の良い人": 340,
        "仲の悪い人": 368,
        "家族構成": 388,
        "smile": 0, //表情差分
        "anger": 6,
        "sad": 85,
        "happy": 85
      };

      const offsetXs = {
        "smile": 0, //表情差分
        "anger": 95,
        "sad": 0,
        "happy": 95
      }

      // 背景画像の取得
      const img = document.getElementById('backgroundImage');

      // canvas要素の取得
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // canvasのサイズを画像に合わせる
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      canvas.style.width = img.width;
      canvas.style.height = img.height;

      // 背景画像をcanvasに描画
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // フォーム入力項目の取得と描画
      const inputs = document.querySelectorAll('input.overlap, textarea.overlap');
      inputs.forEach(input => {
          const { top, left, width } = window.getComputedStyle(input);
          let placeholder = input.placeholder;
          const x = parseFloat(StanderdPos[placeholder]["left"]);
          const y = parseFloat(StanderdPos[placeholder]["top"]) + parseFloat(input.offsetHeight);
          ctx.font = '24.1px MS Gothic';
          ctx.fillStyle = 'black';

          if (input.tagName.toLowerCase() === 'textarea') {
                  const lines = getWrappedText(ctx, input.value, Math.floor(parseFloat(width) * 1.81));
                  lines.forEach((line, index) => {
                      ctx.fillText(line, x - 124.8, 1050 + (index * 20));
                  });
          } else {
              if(input.id == 'creater'){
                  ctx.fillText(input.value, 765, 140);
              }else{
                  const placeholderLen = document.getElementById(input.id).placeholder.length;
                  let offsetY = offsetYs[document.getElementById(input.id).placeholder]
                  let offsetX = 24 * (placeholderLen - 2);

                  if(input.classList.contains("frameshort")){
                      if(input.classList.contains("right")){
                          offsetX = offsetX + (155)
                      }
                      //幅狭フォーム
                      ctx.fillText(input.value, (x - 4) + offsetX, y + offsetY + 126);
                  }else{
                      //幅広フォーム
                      ctx.fillText(input.value, (x - 50) + offsetX, y + offsetY + 75);
                  }
              }
          }
      });

      // 画像ドロップゾーンの画像をcanvasに描画
      for (const [id, data] of Object.entries(imagesData)) {
          const dropZone = document.getElementById(id);
          const {width, height } = window.getComputedStyle(dropZone);
          const x = parseFloat(StanderdPos[id]["left"]);
          const y = parseFloat(StanderdPos[id]["top"]);

          const img = new Image();
          img.src = data.src;
          img.onload = () => {
              let drawWidth = parseFloat(width) * 2;
              let drawHeight = parseFloat(height) * 2;

              // xとyの微調整
              let offsetX = 0;
              let offsetY = 0;

              if (id === "full") {
                // アスペクト比を保って描画するために幅と高さを調整
                const aspectRatio = img.width / img.height;
                if (drawWidth / drawHeight > aspectRatio) {
                  drawWidth = drawHeight * aspectRatio;
                } else {
                  drawHeight = drawWidth / aspectRatio;
                }

                offsetX = 220;
                offsetY = (-drawHeight + (img.height - drawHeight) / 2) + 500;
                console.log(offsetY)
                if(offsetY <= 80){offsetY = 400}
                if(offsetY >= 100){offsetY = 150}
              } else {
                let addOffsetY = offsetYs[id]
                let addOffsetX = offsetXs[id]
                offsetX = ((-drawWidth / 2) + 350) + addOffsetX;
                offsetY = ((-drawHeight / 2) + 140) + addOffsetY;
              }

              ctx.drawImage(img, (x + offsetX), (y + offsetY), drawWidth, drawHeight);
          };
      }

      // 一部画像が描画されるのを待つために少し遅延を追加
      setTimeout(() => {
          // canvasの内容を画像として出力
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'character_sheet.png';
          link.click();
      }, 100);
    }

    function DateCheck(){
      let result = true;
      let checkData = 0;
      let Message = [];
      const inputs = document.querySelectorAll('input.overlap, textarea.overlap');
      inputs.forEach(input => {
        if(input.tagName.toLowerCase() === 'textarea'){
          checkData = 782;
        }else if(input.classList.contains("frameshort")){
          if(input.getAttribute("type") == "number"){
            checkData = 17;
          }else{
            checkData = 3*(11 - input.placeholder.length)
          }
        }else{
          checkData = 60;
        }

        if(getByteLength(input.value) > checkData){
          Message.push(`・${input.placeholder}:${getByteLength(input.value)}/${checkData}byte`)
          if(result){
            result = false;
          }
        }
      })

      if(Message.length > 0){
        alert(`以下項目がbyte数オーバーしました\n※全角文字3byte, 半角文字1byte\n${Message.join("\n")}`)
      }

      return result
    }

		function getWrappedText(ctx, text, maxWidth) {
			let getLines = text.split('\n')
			const lines = [];
			let width = 0;
			let word;
			
			for(let t of getLines){
				let LFLines = t.split('');
				let currentLine = LFLines[0];
				if(currentLine == undefined){currentLine = ''}
				for (let i = 1; i < LFLines.length; i++) {
					word = LFLines[i];
					width = ctx.measureText(currentLine + word).width;
					if (width < maxWidth) {
							currentLine += word;
					} else {
							lines.push(currentLine);
							currentLine = word;
					}
				}
				lines.push(currentLine);
			}

			return lines;
		}

    function getByteLength(str) {
      return new TextEncoder().encode(str).length;
    }
});
