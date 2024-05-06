import classes from './index.module.scss';

const Loading = () => {
    return (
        <div className={`w-full h-full ${classes.loadingBG}`}>
            <div className={classes.loader}>
                {[...Array(20).keys()].map(i => (
                    <span key={i} style={{ '--i': i + 1 }}></span>
                ))}
            </div>
        </div>
    );
};

export default Loading;
