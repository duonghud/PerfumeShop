import './content.css';

function Content(props) {
    const {text , number, active} = props;
    return (
        <>
            <div className={'content ' + (active ? 'content--active' : '')}>
                {text} - {number}
            </div>
        </>
    );

}
export default Content;