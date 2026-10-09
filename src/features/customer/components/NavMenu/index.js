import './nav.css';
function NavMenu() {
    var handleFocus = (event) => {
        event.target.classList.add('input--active');
    }
    var handleBlur = (event) => {
        event.target.classList.remove('input--active');
    }
    return (
        <>
            <div className="nav">
                Navigation Menu
                <form>
                    <input 
                    onFocus={handleFocus}
                    onBlur={handleBlur}>
                    </input>
                </form>
            </div>
        </>
    );
}
export default NavMenu;