 var data = document.querySelector('.searchBox');
         data.onkeyup = filterFunction;
         var option = document.getElementById("vocab");
        var init = 0;
        var searchBut = document.querySelector('.searchBut');
        var show = document.querySelector('#result');
        var posHis = 0;
        var speak = document.querySelector('.speak');
        var lang = document.querySelector('.lang');

        var nHome = document.getElementById('home');
        var nColor = document.getElementById('color');
        var nHis = document.getElementById('historyTitle');
        var nGoo = document.getElementById('google');
        var nAbout = document.getElementById('about');
        var nAcc = document.getElementById('title');

        var check = '';
        var mode = 'en';

        var wordList;
        var requestURL = "Vocab.json";
        var responseJson;
         
        var aboutBtn = document.querySelector('#about');
        var instruc = document.querySelector('.modal');
         aboutBtn.addEventListener('click',function(){
            if(instruc.style.display == "block"){
                 instruc.style.display = "none";
            }
            else{
                instruc.style.display = "block";
            }


        });

        window.onclick = function(event){
            if(event.target == instruc){
                instruc.style.display = "none";
            }
        }

 
        
        responseJson = getJsonData();
        wordList = responseJson['Vocabulary'];
function case_insensitive_search(str, search_str)
            {
                var result = str.search(new RegExp(search_str, "i"));
  
                if (result >= 0){
                return 1;
                }
                else{
                     return 0;
                }  
            }
      
        function filterFunction() {
            var word,word2,wtc ;
             
            wtc = document.getElementById("searchBoxx");
            word2 = wtc.value;
            
            if (mode == 'th') {
           
                if (init == 0) {
                    for (var i = 0; i < wordList.length; i++) {
                        var vocabLi = document.createElement("OPTION");
                        word = wordList[i].meaning;
                        vocabLi.setAttribute("value", word.slice(1, word.length - 1));
                        option.appendChild(vocabLi);
                    }
                    init++;
                }
            }
             if (mode == 'en') {
                
                    while (option.firstChild) {option.removeChild(option.firstChild);}
                         for (var i = 0; i < wordList.length; i++) {
                                var vocabLi = document.createElement("OPTION");
                                word = wordList[i].vocab;
                                word = word.slice(1, word.length - 1);
                                console.log(word);
                                if(word == word2){
                                    break;
                                }
                                if(word2.length > 0){
                                if( case_insensitive_search(word, word2) && word.startsWith(word2) || word.startsWith(word2.toUpperCase()) || word.startsWith(word2.toLowerCase()) ){
                                    vocabLi.setAttribute("value",  word    );
                                    option.appendChild(vocabLi);
                                }

                            } 
                        }
                 
              
               
                
            }
            
            }
            

     

        searchBut.addEventListener('click', search);
        function search() {
            var insertWord = document.querySelector('.searchBox');

            check = insertWord.value.toLowerCase();
            if (mode == 'en') {
                for (var i = 0; i < wordList.length; i++) {
                    var vocabList = wordList[i].vocab;
                    if (check == '' || check == ' ' || check == "  " || check == "   ") {
                        show.textContent = "Please enter something";
                    }  
                    else if (vocabList.includes(check)) {
                        if (vocabList.length == (check.length + 2)) {
                            show.textContent = vocabList + " \n " + wordList[i].meaning;
                            addHistory(vocabList);
                            break;
                        }
                    }
                    else {
                        show.textContent = "Sorry, we can't find your word (" + check + ")";
                    }
                }
            } else if (mode == 'th') {
                for (var i = 0; i < wordList.length; i++) {
                    var vocabList = wordList[i].meaning;
                    if (check == '' || check == ' ' || check == "  " || check == "   ") {
                        show.textContent = "Please enter something";
                    }
                    else if (vocabList.includes(check)) {
                        if (vocabList.length == (check.length + 2)) {
                            show.textContent = wordList[i].vocab + " \n " + vocabList;
                            addHistory(wordList[i].vocab);
                            break;
                        }
                    }
                    else {
                        show.textContent = "Sorry, we can't find your word (" + check + ")";
                    }
                }
            }

        }

        speak.addEventListener('click', speech);
        function speech() {
        var line = show.textContent.split('\n');
            VoiceRSS.speech({
                key: '2558902b05234f43906c04edebfc269c',
                src: line[0],
                hl: 'en-us',
                r: 0,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
        }

        function addHistory(wordHis) {
            var history = document.querySelector('#history');
            var listWord = document.createElement('input');

            if (checkHis(wordHis) == true) {
                listWord.setAttribute('type', 'button');
                listWord.setAttribute('class', 'listWord');
                listWord.setAttribute('value', wordHis);

                listWord.addEventListener('click', showMean);
                history.appendChild(listWord);
                $(document).ready(function () {
                    $('.listWord').css('background-color', window.getComputedStyle(document.getElementById('dropdown-content'),null).getPropertyValue('background-color'));
                    $('.listWord').hover(function () {
                        $(this).css('background-color', window.getComputedStyle(document.getElementById('dropdown-content'),null).getPropertyValue('background-color'));
                    }, function () {
                        $(this).css('background-color', 'initial');
                    });
                });
            }
        }

        function checkHis(checkWord) {
            var history = document.querySelector('#history');
            var checkLoop = 0;

            if (history.childElementCount == 0) {
                return true;
            } else {
                for (var i = 0; i < history.childElementCount; i++) {
                    if (checkWord == history.children[i].getAttribute('value')) {
                        checkLoop++;
                        return false;
                    }
                }
                if (checkLoop == 0) {
                    return true;
                }
            }
        }

        function showMean(event) {
            var e = event.target;
            for (var i = 0; i < wordList.length; i++) {
                var vocabList = wordList[i].vocab;
                if (vocabList.length == (e.value.length)) {
                    if (vocabList.includes(e.value)) {
                        show.textContent = vocabList + " \n " + wordList[i].meaning;
                        break;
                    }
                }
            }
        }

        lang.addEventListener('click', changeLang)
        function changeLang() {
            var inLang = lang.getAttribute('value');
            if (inLang == 'EN') {
                lang.setAttribute('value', 'ไทย');
                nHome.textContent = "หน้าหลัก";
                nColor.textContent = "เปลี่ยนสี";
                nHis.textContent = "ประวัติ";
                nGoo.textContent = "แปลด้วย Google";
                nAbout.textContent = "เกี่ยวกับ";
                nAcc.textContent = "ศัพท์ทางบัญชี";
                data.setAttribute('placeHolder', 'ตัวอย่าง: ถัวเฉลี่ย');
                searchBut.setAttribute('value', 'ค้นหา');
                show.textContent = 'พื้นที่สำหรับคำแปล';
                speak.setAttribute('value', 'เสียงพูด');
                /////////////////////////////////////////
                mode = 'th';
                init = 0;
                while (option.firstChild) {
                    option.removeChild(option.firstChild);
                }
                 
            } else {
                lang.setAttribute('value', 'EN');
                nHome.textContent = "Home";
                nColor.textContent = "Color";
                nHis.textContent = "History";
                nGoo.textContent = "Google translate";
                nAbout.textContent = "About";
                nAcc.textContent = "Accounting Vocabulary";
                data.setAttribute('placeHolder', 'Example: average');
                searchBut.setAttribute('value', 'Search');
                show.textContent = 'Translation Area';
                speak.setAttribute('value', 'Speak');
                mode = 'en';
                init = 0;
                while (option.firstChild) {
                    option.removeChild(option.firstChild);
                }
                
            }

        }

        $(document).ready(function () {
            $('.col1').click(function () {
                $('.searchBox').css('color', '#ffffff');
                $('.searchBox').css('background-color', '#f6aa1c');
                $('.searchBut').css('background-color', '#bc2808');
                $('.searchBut').css('border', '2px solid #6a1503');
                $('.speak').css('background-color', '#bc2808');
                $('.speak').css('color', '#ffffff');
                $('.speak').css('border', '2px solid #6a1503');
                $('.searchDiv').css('background-color', '#220901');
                $('li a').hover(function () {
                    $(this).css('background-color', '#5b1702');
                }, function () {
                    $(this).css('background-color', 'initial');
                });
                $('.dropdown-content').css('background-color', '#521306');
                $('.active').css('background-color', '#941b0c');
                $('.active').hover(function () {
                    $(this).css('background-color', '#5b1702');
                }, function () {
                    $(this).css('background-color', '#941b0c');
                });
                $('h1').css('color', '#941b0c');
                $('#result').css('background-color', '#511206');
                $('#result').css('color', '#ffffff');
                $('.lang').css('background-color', '#621708');
                $('input[type=image]').hover(function () {
                    $(this).css('border', '5px solid #6a1503');
                }, function () {
                    $(this).css('border', '0px');
                });
                $('.listWord').css('background-color', '#521306');
                $('.listWord').hover(function () {
                    $(this).css('background-color', '#87230f');
                }, function () {
                    $(this).css('background-color', '#521306');
                });
            });
            $('.col2').click(function () {
                $('.searchBox').css('color', '#ffffff');
                $('.searchBox').css('background-color', '#ff729f');
                $('.searchBut').css('background-color', '#56cbf9');
                $('.searchBut').css('border', '2px solid #2b8ab0');
                $('.speak').css('background-color', '#7f7caf');
                $('.speak').css('border', '2px solid #59558e');
                $('.searchDiv').css('background-color', '#7f7caf');
                $('li a').hover(function () {
                    $(this).css('background-color', '#59558e');
                }, function () {
                    $(this).css('background-color', 'initial');
                });
                $('.dropdown-content').css('background-color', '#9a97c3');
                $('.active').css('background-color', '#61d8c4');
                $('.active').hover(function () {
                    $(this).css('background-color', '#81f4e1');
                }, function () {
                    $(this).css('background-color', '#61d8c4');
                });
                $('h1').css('color', '#65dcc8');
                $('#result').css('background-color', '#81f4e1');
                $('#result').css('color', '#0d6355');
                $('.lang').css('background-color', '#ff729f');
                $('input[type=image]').hover(function () {
                    $(this).css('border', '5px solid #6a1503');
                }, function () {
                    $(this).css('border', '0px');
                });
                $('.listWord').css('background-color', '#9a97c3');
                $('.listWord').hover(function () {
                    $(this).css('background-color', '#6d69a3');
                }, function () {
                    $(this).css('background-color', '#9a97c3');
                });
            });
            $('.col3').click(function () {
                $('.searchBox').css('color', '#ffffff');
                $('.searchBox').css('background-color', '#8a36a4');
                $('.searchBut').css('background-color', '#43cdac');
                $('.searchBut').css('border', '2px solid #0e5d4a');
                $('.speak').css('background-color', '#1ead6c');
                $('.speak').css('border', '2px solid #0e663e');
                $('.speak').css('color', 'white');
                $('.searchDiv').css('background-color', '#550c6c');
                $('li a').hover(function () {
                    $(this).css('background-color', '#8a36a4');
                }, function () {
                    $(this).css('background-color', 'initial');
                });
                $('.dropdown-content').css('background-color', '#320440');
                $('.active').css('background-color', '#ec4365');
                $('.active').hover(function () {
                    $(this).css('background-color', '#971c35');
                }, function () {
                    $(this).css('background-color', '#ec4365');
                });
                $('h1').css('color', '#fed24f');
                $('#result').css('background-color', '#ec4365');
                $('#result').css('color', '#681526');
                $('.lang').css('background-color', '#fed24f');
                $('input[type=image]').hover(function () {
                    $(this).css('border', '5px solid #b170c5');
                }, function () {
                    $(this).css('border', '0px');
                });
                $('.listWord').css('background-color', '#320440');
                $('.listWord').hover(function () {
                    $(this).css('background-color', '#670c82');
                }, function () {
                    $(this).css('background-color', '#320440');
                });
            });
            $('.col4').click(function () {
                $('.searchBox').css('color', '#fffcf4');
                $('.searchBox').css('background-color', '#f1d07e');
                $('.searchBut').css('background-color', '#da2123');
                $('.searchBut').css('border', '2px solid #7d0e0f');
                $('.speak').css('background-color', '#22acd2');
                $('.speak').css('border', '2px solid #136981');
                $('.searchDiv').css('background-color', '#eec832');
                $('li a').hover(function () {
                    $(this).css('background-color', '#b4961e');
                }, function () {
                    $(this).css('background-color', 'initial');
                });
                $('.dropdown-content').css('background-color', '#d3b230');
                $('.active').css('background-color', '#da2123');
                $('.active').hover(function () {
                    $(this).css('background-color', '#7f0e0f');
                }, function () {
                    $(this).css('background-color', '#da2123');
                });
                $('h1').css('color', '#196686');
                $('#result').css('background-color', '#196686');
                $('#result').css('color', '#b8e0f0');
                $('.lang').css('background-color', '#22acd2');
                $('input[type=image]').hover(function () {
                    $(this).css('border', '5px solid #74621a');
                }, function () {
                    $(this).css('border', '0px');
                });
                $('.listWord').css('background-color', '#d3b230');
                $('.listWord').hover(function () {
                    $(this).css('background-color', '#f0d25e');
                }, function () {
                    $(this).css('background-color', '#d3b230');
                });
            });
            $('.col5').click(function () {
                $('.searchBox').css('color', '#454545');
                $('.searchBox').css('background-color', '#bebfbf');
                $('.searchBut').css('background-color', '#d9764f');
                $('.searchBut').css('border', '2px solid #9b5438');
                $('.speak').css('background-color', '#e3e7ee');
                $('.speak').css('color', '#515d73');
                $('.speak').css('border', '2px solid #515d73');
                $('.searchDiv').css('background-color', '#313443');
                $('li a').hover(function () {
                    $(this).css('background-color', '#62667b');
                }, function () {
                    $(this).css('background-color', 'initial');
                });
                $('.dropdown-content').css('background-color', '#444963');
                $('.active').css('background-color', '#ed8258');
                $('.active').hover(function () {
                    $(this).css('background-color', '#b05b3a');
                }, function () {
                    $(this).css('background-color', '#ed8258');
                });
                $('h1').css('color', '#898989');
                $('#result').css('background-color', '#313443');
                $('#result').css('color', '#b0b5cd');
                $('.lang').css('background-color', '#515d73');
                $('input[type=image]').hover(function () {
                    $(this).css('border', '5px solid #1e2131');
                }, function () {
                    $(this).css('border', '0px');
                });
                $('.listWord').css('background-color', '#444963');
                $('.listWord').hover(function () {
                    $(this).css('background-color', '#6b7398');
                }, function () {
                    $(this).css('background-color', '#444963');
                });
            });

        });
