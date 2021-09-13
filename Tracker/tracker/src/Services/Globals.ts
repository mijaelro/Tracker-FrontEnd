class Globals{
};
class DevelopmentGlobals extends Globals{
    public urls = {
        user:"http://localhost:8080/user/",     
        admin: "http://localhost:8080/admin/",
        client: "http://localhost:8080/client/"
    };
};

class ProductionGlobals extends Globals{
    public urls = {
        user:"http://localhost:8080/user/",     
        admin: "http://localhost:8080/admin/",
        client: "http://localhost:8080/client/"

    };
};

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;