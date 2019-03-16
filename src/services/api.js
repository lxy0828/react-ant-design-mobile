import Domain from './domain';
console.log(Domain)
let basUrl
let refereeUrl
if (process.env.NODE_ENV === 'development') {
    // 开发环境
    refereeUrl = '/REFEREE';
    basUrl = "/ACCOUNT";
} else {
    // 生产环境
    refereeUrl = Domain.REFEREE
    basUrl = Domain.USER
}
export default {
    user: {
        getUserInfo: refereeUrl + '/public/register_plan/isInPlan'
    }
}

