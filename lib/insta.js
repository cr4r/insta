let axios = require(`axios`);
let cheerio = require('cheerio');

const ig = async (url) => {
    image_url = url;
    if(image_url !== undefined){
        if(image_url.substring(0,8) === 'https://' || image_url.substring(0,7) === 'http://'){
            try{
                a = await axios.get(url)
                if(a.status === 200){
                    let $ = cheerio.load(a.data);
                    let file = $('meta[property="og:type"]').attr('content');
                    let tagnya = $(`meta[property="og:${file}"]`).attr('content');
                    let url = $('meta[property="og:url"]').attr('content');
                    let title = $('meta[property="og:title"]').attr('content');
                    return {'status':'ok', 'judul': title, 'from':url, 'url':tagnya, 'type':file };
                }else{
                    if(a.status === 400){ return {'status':'no','result':'Error, tidak bisa mengunjungi link tersebut' } }
                }
            }catch (error) {
                return {'status':'no','result':'Tidak ada','error':error}
            }
        }else{
            return {'status':'no', 'result': 'link salah!' };
        }
    }else{
        return { 'status':'no', 'result': 'Link tidak ada'};
    }
}

const igstalk = async (username) => {
    try{
        const {data} = await axios.get(`https://www.instagram.com/${username}/?__a=1`);
        userr = data.graphql.user;
        let followers = userr.edge_followed_by.count;
        let following = userr.edge_follow.count;
        let fullname = userr.full_name;
        let user_name = userr.username;
        let profile_pic = userr.profile_pic_url_hd;
        let jumFoto = userr.edge_owner_to_timeline_media.count;
        let jumVideo = userr.edge_felix_video_timeline.count;
        return {'status':'ok','username':user_name, 'followers':followers, 'following':following, 'fullname':fullname , 'fullPic':profile_pic,'jumFoto':jumFoto,'jumVideo':jumVideo}
    }catch (error) {
        return {'status':'no','result':'Tidak ada','error':error}
    }
}

exports.igstalk = igstalk;
exports.ig = ig;