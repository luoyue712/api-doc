# 歌曲搜索API <Badge type="tip" text="V3" />
::: danger
此接口仍在开发中，在此期间接口可能会经常变更，不建议使用。
:::

## 接口描述

- 用于歌曲列表搜索，支持分页。

## 接口地址
-  `GET` `/music/tencent/search/song`

## 请求数据类型
- `application/x-www-form-urlencoded`

## 请求示例
- https://api.vkeys.cn/music/tencent/search/song?keyword=狐妖小红娘

## 请求参数
<div class="table-overflow">

|   参数名   | 是否必填 |  数据类型   | 默认值 | 说明                  |
|:-------:|:----:|:-------:|:---:|:--------------------|
| keyword |  是   | string  |  /  | 歌名                  |
|  page   |  否   |   int   |  1  | 当前页数                |
|  limit  |  否   |   int   | 10  | 每页显示数，区间：[1,60]     |

</div>

## 返回示例
``` json{12-13,15,19,30}
{
    "code": 0,
    "message": "访问成功",
    "data": {
        "meta": { // [!code ++]
            "total": 1001, //搜索结果总数 [!code ++]
            "nextPage": 2, //下一页的页码 [!code ++]
            "perPage": 10 //当前每页显示数 [!code ++]
        }, // [!code ++]
        "list": [
            {
                "songID": 105648974, //歌曲ID
                "songMID": "0023CVP23SH17s", //歌曲mid
                "vid": "v00199a1i1e", //mv的vid
                "title": "梦回还", //歌曲名
                "subtitle": "《狐妖小红娘·王权篇》网络动画片头曲", //副标题
                "album": "狐妖小红娘 动画原声带", //专辑名
                "singer": "呦猫UNEKO", //歌手名（多个歌手以/分割）
                "singerList": [ //歌手列表
                    {
                        "id": 1092914, //歌手ID
                        "mid": "003VD9fu3Eh1q4", //歌手mid
                        "name": "呦猫UNEKO", //歌手名
                        "pmid": "",
                        "title": "呦猫UNEKO", //歌手名
                        "type": 1,
                        "uin": 0
                    }
                ],
                "albumImage": "https://y.qq.com/music/photo_new/T002R800x800M000000wd19g0wTd0d.jpg",//封面地址
                "pay": "付费", //是否付费（初步判断）
                "time": "2016-07-08", //发布时间
                "type": 0, //歌曲类型（点歌时需要用到）
                "bpm": 84, //BPM值
                "interval": 250, //时长（单位：秒） [!code ++]
                "volume": { // [!code ++]
                    "gain": -12.687000274658203, // 增益值（音质增强） [!code ++]
                    "lra": 3.1640000343322754, // 采样峰值（音质增强） [!code ++]
                    "peak": 0.996999979019165 //响度范围（音质增强） [!code ++]
                }, // [!code ++]
                "content": "", //歌词（仅在歌词搜索时有效）
                "quality": "无音质", //已删除，如有需要请使用歌曲信息及音质列表API [!code --]
                "grp": [] //多版本列表，与list保持一致
            }
        ]
    }
}
```
