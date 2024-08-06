package com.reactapp;

import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.reactapp.api.ApiClient;
import com.reactapp.api.ApiInterface;
import com.reactapp.api.Repo;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.Arrays;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class DataModule extends ReactContextBaseJavaModule {
    private final ApiInterface apiInterface;

    public DataModule(ReactApplicationContext context) {
        super(context);
        Retrofit apiClient = ApiClient.getClient();
        apiInterface = apiClient.create(ApiInterface.class);
    }

    @ReactMethod
    private void search(String query, final Promise promise) {
        WritableArray array = Arguments.createArray();
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();

        Call<ArrayList<Repo>> repoInfoCall = apiInterface
                .getAllRepos(query);
        repoInfoCall.enqueue(new Callback<>() {
            @Override
            public void onResponse(@NonNull Call<ArrayList<Repo>> call,
                                   @NonNull Response<ArrayList<Repo>> response) {
                ArrayList<Repo> userRepos = response.body();
                if (userRepos != null) {
                    for (Repo r : userRepos) {
                        array.pushString(gson.toJson(r));
                    }
                    promise.resolve(array);
                } else promise.reject("Error", "No results");

            }

            @Override
            public void onFailure(@NonNull Call<ArrayList<Repo>> call,
                                  @NonNull Throwable throwable) {
                promise.reject(throwable);
            }
        });

    }

    @NonNull
    @Override
    public String getName() {
        return "DataModule";
    }
}
