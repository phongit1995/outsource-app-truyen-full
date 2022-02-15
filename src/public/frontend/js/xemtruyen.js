$( document ).ready(function() {
    $('#select-hot').change(function(){
        console.log(this.value);
        $.ajax({
            type: 'get',
            url:`/api/list-new-buy-category?page=1&pageSize=13&category=${this.value}`
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
    $('#select-new').change(function(){
        $.ajax({
            type: 'get',
            url:`/api/list-new-buy-category?page=1&pageSize=21&category=${this.value}`
        }).done((data)=>{
            console.log(data);
            const result = data.map((item,index)=>{
                let categoryHtml = item.category.map((cate)=>{
                    return `<a itemprop="genre" href="the-loai/huyen-huyen" title="${cate}">${cate}</a> `
                })
                return `
                <div class="row" itemscope itemtype="https://schema.org/Book">
                        <div class="col-xs-9 col-sm-6 col-md-5 col-title"> <span
                                class="glyphicon glyphicon-chevron-right"></span>
                            <h3 itemprop="name"><a href="/${item.slug}" title="Lam Đình Chi Chủ" itemprop="url">${item.name} </a></h3>
                        </div>
                        <div class="hidden-xs col-sm-3 col-md-3 col-cat text-888">
                            ${categoryHtml.join("")}
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-4 col-chap text-info"> <a
                                href="lam-dinh-chi-chu/chuong-58-ket-cuoc" title="${item.last_chapter.name}"> <span
                                    class="chapter-text"><span></span>${item.last_chapter.title}</span> </a> </div>
                </div>
                `
            })
            $('.list-truyen.list-new >div[class=row]').remove();
            $('.list-truyen.list-new').append(result);
        })
    })
});