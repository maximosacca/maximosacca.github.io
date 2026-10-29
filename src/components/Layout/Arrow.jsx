export default function Arrow({isSecondary = false}) {
    return (
        <>
            <div className='container arrow'>
                <span className={`scroll-arrow ${isSecondary ? 'secondary' : ''}`.trim()} >
                    ↓
                </span>
            </div>
        </>
    )
}