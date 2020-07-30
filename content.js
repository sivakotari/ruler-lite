
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

    const removeNode = (node) => {
        node.remove(node);
    };

    const hasClass = (event,cls) => {
        return event.target.classList.contains(cls);
    }

    const rulerElement = (event) => {
        const axis = event.currentTarget.id.split('__')[1];
        const cls = 'rule__' + axis;
        if(hasClass(event,cls)) {
            return event.target;
        }
        else{
            const uid = uniqueId();
            return createEle({element:'div',class:cls,uid});
        }
    };

    const barMousedown = () => {
        const {event} = this;
        event.preventDefault();
        const rule = rulerElement(event);
        rule.ondblclick = () => removeNode(rule);
        document.onmouseup = () => barMouseUp(rule);
        document.onmousemove = () => barMouseDrag(rule);
    };

    const barMouseDrag = (rule) => {
        const {event} = this;
        event.preventDefault();
        const axis = rule.className.split('__')[1];
        const id = 'ruler-lite__' + axis;
        const element = document.getElementById(id);
        element.appendChild(rule);
        if(axis === 'x')
            rule.style.top = `${event.clientY}px`;
        else
            rule.style.left = `${event.clientX}px`;
        document.onmouseup = () => barMouseUp(rule);
    };

    const barMouseUp = (rule) => {
        const {event} = this;
        const axis = rule.className.split('__')[1];
        const id = 'ruler-lite__' + axis;
        const element = document.getElementById(id);
        if(rule) {
            
        }
        if(axis === 'x'){
            if(rule && event.clientY <= element.clientHeight){
                removeNode(rule);
            }   
        }
        else{
            if(rule && event.clientX <= element.clientWidth){
                removeNode(rule);
            }
        }
        document.onmouseup = null;
        document.onmousemove = null;    
    };
    
    const body = document.querySelector('body');
    const barX  = createEle({element:'div',id:'ruler-lite__x'});
    const barY  = createEle({element:'div',id:'ruler-lite__y'});
    body.appendChild(barX);
    body.appendChild(barY);
    barX.onmousedown = barMousedown;
    barY.onmousedown = barMousedown;
});
