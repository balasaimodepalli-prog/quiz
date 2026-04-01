qustions=[]
let qno=0
let score=0
function startQuiz(){
    const category=document.getElementById('category').value;
    const difficulty=document.getElementById('difficulty').value;
    const numQuestions=document.getElementById('questions').value;
    const type=document.getElementById('type').value;

    fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
    .then(res=>res.json())
    .then(data=>{
        qustions=data.results;
        document.getElementById('play').style.display='none';
        document.getElementById('quiz').style.display='block';
        showQuestions()
    })
    .catch(err=>console.error(err));
    
}
function showQuestions(){
    let q = qustions[qno];

    document.getElementById('qNo').innerText = `Question ${qno+1}`;
    document.getElementById('question').innerHTML = decodeHTML(q.question);

    let options = [...q.incorrect_answers, q.correct_answer];

    
    options.sort();

    let optionsHtml = options.map(opt =>
        `<button onclick="checkAnswer(this, '${opt}')" class="option">
            ${decodeHTML(opt)}
        </button>`
    ).join('');

    document.getElementById('options').innerHTML = optionsHtml;
}
function checkAnswer(btn, opt){
    let q = qustions[qno];
    let correct = q.correct_answer;

    let buttons = document.querySelectorAll('.option');

    buttons.forEach(b => {
        b.disabled = true;

        if (b.innerText === decodeHTML(correct)) {
            b.style.background = "green";
            b.style.color = "white";
        }
    });

    if (opt !== correct) {
        btn.style.background = "red";
        btn.style.color = "white";
    } else {
        score++;
    }

    document.getElementById('nextBtn').disabled = false;
}
function nextQuestion(){
    qno++;  
    if(qno<qustions.length){
        showQuestions();
        document.getElementById('nextBtn').disabled=true;
    }   
    else{
        document.getElementById('quiz').style.display='none';
        document.getElementById('score').style.display='block';
        document.getElementById('result').innerText=`Your Score: ${score}/${qustions.length}`;
    }
}
function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function restart(){
    qno=0;
    score=0;
    document.getElementById('score').style.display='none';
    document.getElementById('play').style.display='block';
}