async function removeCourse(id) {
    const result = await removeCourse.deleteOne({_id: id})
    console.log(result)
}
removeCourse()