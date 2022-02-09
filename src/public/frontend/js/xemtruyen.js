$( document ).ready(function() {
    $('#select-hot').change(function(){
        console.log(this.value);
        $.ajax({
            type: 'get',
            url:`/api/list-manga-buy-category?page=1&pageSize=13&category=${this.value}`
        }).done((data)=>{
            console.log(data);
            const result = data.map((item,index)=>{
                return `
                <div class="item top-${index+1}" itemscope itemtype="https://schema.org/Book"> <a
                            href="/${item.slug}" itemprop="url"> <img
                                src="${item.image}"
                                alt="${item.name}" class="img-responsive item-img" itemprop="image" />
                            <div class="title">
                                <h3 itemprop="name">${item.name}</h3>
                            </div>
                        </a> </div>
                `
            })
            $("#content-hot").html(result.join(" "));
        })
    })
});