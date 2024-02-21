package com.example.binarybrink;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.HorizontalScrollView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

public class HomeFragment extends Fragment {

    private LinearLayout newsLayout;
    private LinearLayout newsLayout1;
    private HorizontalScrollView newsScrollView;
    private HorizontalScrollView newsScrollView1;
    private Handler handler;
    private CardView battery, Charging, ChargingStationsVisited,Transactions ;

    private final long SCROLL_DELAY = 5000;

    public HomeFragment() {}

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_home, container, false);

        newsLayout = rootView.findViewById(R.id.news);
        newsLayout1 = rootView.findViewById(R.id.news1);
        battery = rootView.findViewById(R.id.cardBattery);
        Charging = rootView.findViewById(R.id.cardCharging);
        ChargingStationsVisited = rootView.findViewById(R.id.cardChargingStationsVisited);
        Transactions = rootView.findViewById(R.id.cardTransactions);

        battery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), BatteryActivity.class);
                startActivity(intent);
            }
        });

        ChargingStationsVisited.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), ChargingStationsVisitedActivity.class);
                startActivity(intent);
            }
        });

        Charging.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), ChargeActivity.class);
                startActivity(intent);
            }
        });

        Transactions.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), TransactionsActivity.class);
                startActivity(intent);
            }
        });


        addNewsItem(newsLayout, "Breaking News 1", "This is the first breaking news.", 1040, 400);
        addNewsItem(newsLayout, "Breaking News 2", "This is the second breaking news.", 1040, 400);
        addNewsItem(newsLayout, "Breaking News 3", "This is the third breaking news.", 1040, 400);

        addNewsItem(newsLayout1, "Breaking News 4", "This is the fourth breaking news.", 1040, 400);
        addNewsItem(newsLayout1, "Breaking News 5", "This is the fifth breaking news.", 1040, 400);
        addNewsItem(newsLayout1, "Breaking News 6", "This is the sixth breaking news.", 1040, 400);

        newsScrollView = rootView.findViewById(R.id.HorizontalScrollView);
        newsScrollView1 = rootView.findViewById(R.id.HorizontalScrollView1);

        handler = new Handler();
        startAutoScroll();

        return rootView;
    }

    private void addNewsItem(LinearLayout layout, String title, String description, int cardWidth, int cardHeight) {
        CardView cardView = new CardView(getContext());
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                cardWidth,
                cardHeight
        );
        layoutParams.setMargins(16, 16, 16, 16);
        cardView.setLayoutParams(layoutParams);
        cardView.setCardBackgroundColor(getResources().getColor(android.R.color.black));
        //cardView.setCardBackgroundColor(Color.parseColor("#FF0D1823"));
        cardView.setRadius(8);

        TextView textView = new TextView(getContext());
        textView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));
        textView.setTextAppearance(getContext(), android.R.style.TextAppearance_Material_Body1);
        textView.setText(title + "\n" + description);
        textView.setPadding(16, 16, 16, 16);

        cardView.addView(textView);
        layout.addView(cardView);
    }

    private void startAutoScroll() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                newsScrollView.smoothScrollBy(1070, 0);
                newsScrollView1.smoothScrollBy(1070, 0);

                handler.postDelayed(this, SCROLL_DELAY);
            }
        }, SCROLL_DELAY);
    }
}
