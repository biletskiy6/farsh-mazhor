import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private authenticationService: AuthenticationService) {
        super({ header: "apiKey", prefix: "" }, true, (apikey, done, req) => {
            const checkKey = authenticationService.validateApiKey(apikey);
            if(!checkKey) return done(false)
            return done(true)
        })
    }
}