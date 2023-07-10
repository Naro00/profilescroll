(() => {
    const stepElement = document.querySelectorAll('.step');
    const graphicElemnet = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElemnet[0]; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; //*1은 숫자로 인덱스 넘버를 바꿔주기 위해서
    });

    for (let i = 0; i < stepElement.length; i++) {
        io.observe(stepElement[i]);
        //stepElement[i].setAttribute('data-index', i);
        stepElement[i].dataset.index = i;
        graphicElemnet[i].dataset.index = i;
    }

    function activate() {
        currentItem.classList.add('visible');
    }

    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElement[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect(); //화면의 객체의 위치를 알려줌

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8 ) {
                
                inactivate();
                currentItem = graphicElemnet[step.dataset.index];
                activate();
                }
        }
    });
    window.addEventListener('load', () => {
        setTimeout(()=>scrollTo(0, 0), 100);
    });
    activate();
})(); //자동으로 바로 호출되도록 무기명 함수 뒤에 실행 괄호 만듬//