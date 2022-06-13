/**
 * @param obj
 * @return {arg_name: validation_message}
*/
export function emptyy(body) {
    Object.keys(body).forEach(e => {
        if(body[e] === "") {
            return { validation: {[e]: 'Bu alan boş bırakılamaz'} }
        } else {return null}
    });
}