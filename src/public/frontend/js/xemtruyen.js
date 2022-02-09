$( document ).ready(function() {
    $('#select-hot').change(function(){
        console.log(this.value);
    })
    const data =[];
    $("#select-hot option").each(function(){
    // Add $(this).val() to your list
        data.push({
            id:this.value,
            name:$(this).text()
        })
    });
    console.log(data);
});