import {imgToSvgByRef} from "./imgToSvg";

const SvgIcon = (props, context) => {
    const onload = e => {
        imgToSvgByRef(e.path[0])
            .then(svg => {
                    svg.addEventListener('click',
                        e => context.emit('click', e))
                }
            )
    }


    return (
        <img
            alt=""
            src={props.icon}
            className={props.customClass}
            width={props.width}
            height={props.height}
            onLoad={onload}/>
    )
}

SvgIcon.props = ['icon', 'custom-class', 'width', 'height']

export default SvgIcon
