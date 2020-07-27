
window.addEventListener('DOMContentLoaded', event => {
    let idSet = new Set();


    const genId = () => Math.ceil(Math.random() * (1000 - 100) + 100);

    const uniqueId = () => {
        let id = genId();
        if(idSet.has(id)) {
            uniqueId();
        }
        idSet.add(id);
        return id;
    }

    const createEle = ({...args}) => {
        const element = document.createElement(args.element);
        if(args.class) {
            element.className = args.class;
        }
        if(args.id) {
            element.id = args.id;
        }
        return element;
    };

    const removeEle = (parent,child) => {
        parent.removeChild(child);
    };

    const hasClass = (event,cls) => {
        return event.target.classList.contains(cls);
    }

    const rulerElement = (event) => {
        if(hasClass(event,'rule')) {
            return event.target;
        }
        else{
            const id = uniqueId();
            return createEle({element:'div',class:'rule',id});
        }
    };

    const barMousedown = () => {
        let {event} = this;
        event.preventDefault();
        const rule = rulerElement(event);
        rule.ondblclick = () => removeEle(bar,rule);
        document.onmouseup = () => barMouseUp();
        document.onmousemove = () => barMouseDrag(rule);
    };

    const barMouseDrag = (rule) => {
        let {event} = this;
        event.preventDefault();
        bar.appendChild(rule);
        rule.style.top = `${event.clientY}px`;
        document.onmouseup = () => barMouseUp(rule);
    };

    const barMouseUp = (rule) => {
        let {event} = this;
        if(rule && event.clientY <= bar.clientHeight){
            removeEle(bar,rule);
        }
        document.onmouseup = null;
        document.onmousemove = null;    
    };
    
    const body = document.querySelector('body');
    const bar  = createEle({element:'div',id:'complex_id'});
    body.appendChild(bar);
    bar.onmousedown = barMousedown;
});
