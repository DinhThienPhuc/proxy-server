local x_request_uri = ngx.var.request_uri
local target = ngx.var.target

local EXTENSIONS_DICT = {
    html = 'html',
    chn = 'html',
    htm = 'html',
    jpeg = 'image',
    jpg = 'image',
    png = 'image',
    gif = 'image'
}

local TARGET_DICT = {
    html = 'ps_nginx_html:7001',
    image = 'ps_nginx_image:7002',
    none = 'ps_nginx:7000'
}

local function get_url_type(url)
    local full_name = url:match("([^/]+)$")
    local ext = full_name:match("%.(.+)$")
    local url_type = EXTENSIONS_DICT[ext]

    if url_type then return url_type end
    return "none"
end

local url_type = get_url_type(x_request_uri)
target = TARGET_DICT[url_type]

ngx.var.target = target
